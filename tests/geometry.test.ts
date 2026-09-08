import { describe, it, expect } from 'vitest';
import {
  buildGeometrySvg,
  buildGeometryMap,
  mapTilesUrl,
  fetchMapTilesToken,
  DEFAULT_TILE_URL,
  DEFAULT_TILE_ATTRIBUTION,
  type Bbox,
  type GeoJsonPolygon,
  type GeoJsonMultiPolygon,
  type GeoJsonGeometry,
} from '../src/geometry';

// Boulder-ish box: lon-first [minlon, minlat, maxlon, maxlat].
const BBOX: Bbox = [-105.3, 39.9, -105.1, 40.1];

function viewBoxDims(viewBox: string): { x: number; y: number; w: number; h: number } {
  const [x, y, w, h] = viewBox.split(' ').map(Number);
  return { x, y, w, h };
}

describe('buildGeometrySvg', () => {
  it('projects the bbox into a cos-latitude-corrected, y-up viewBox', () => {
    const { viewBox } = buildGeometrySvg(BBOX);
    const { x, y, w, h } = viewBoxDims(viewBox);
    expect(x).toBe(0);
    expect(y).toBe(0);
    // width = (maxlon - minlon) * cos(centroidLat)
    const kx = Math.cos((40.0 * Math.PI) / 180);
    expect(w).toBeCloseTo(0.2 * kx, 5);
    // height = maxlat - minlat (unscaled)
    expect(h).toBeCloseTo(0.2, 5);
    // cos-lat correction shrinks x relative to y away from the equator
    expect(w).toBeLessThan(h);
  });

  it('returns empty polygonPaths for a valid bbox with no geometry', () => {
    const { polygonPaths } = buildGeometrySvg(BBOX);
    expect(polygonPaths).toEqual([]);
  });

  it('builds one path for a Polygon and emits a closed M…Z path', () => {
    const poly: GeoJsonPolygon = {
      type: 'Polygon',
      coordinates: [[
        [-105.3, 39.9],
        [-105.1, 39.9],
        [-105.1, 40.1],
        [-105.3, 40.1],
        [-105.3, 39.9],
      ]],
    };
    const { polygonPaths } = buildGeometrySvg(BBOX, poly);
    expect(polygonPaths).toHaveLength(1);
    expect(polygonPaths[0]).toMatch(/^M/);
    expect(polygonPaths[0]).toMatch(/Z$/);
    // Top-left corner of the box projects to (0, 0): minlon, maxlat.
    expect(polygonPaths[0]).toContain('M0,0');
  });

  it('ignores interior holes — one outer ring per Polygon', () => {
    const poly: GeoJsonPolygon = {
      type: 'Polygon',
      coordinates: [
        [[-105.3, 39.9], [-105.1, 39.9], [-105.1, 40.1], [-105.3, 39.9]],
        [[-105.25, 39.95], [-105.15, 39.95], [-105.15, 40.05], [-105.25, 39.95]],
      ],
    };
    expect(buildGeometrySvg(BBOX, poly).polygonPaths).toHaveLength(1);
  });

  it('builds one path per polygon for a MultiPolygon', () => {
    const multi: GeoJsonMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [[[-105.3, 39.9], [-105.2, 39.9], [-105.2, 40.0], [-105.3, 39.9]]],
        [[[-105.2, 40.0], [-105.1, 40.0], [-105.1, 40.1], [-105.2, 40.0]]],
      ],
    };
    expect(buildGeometrySvg(BBOX, multi).polygonPaths).toHaveLength(2);
  });

  it('returns empty paths for an unknown geometry type without throwing', () => {
    const point = { type: 'Point', coordinates: [-105.2, 40.0] } as unknown as GeoJsonGeometry;
    expect(() => buildGeometrySvg(BBOX, point)).not.toThrow();
    expect(buildGeometrySvg(BBOX, point).polygonPaths).toEqual([]);
  });

  it('clamps a degenerate (zero-span) bbox to a non-zero viewBox', () => {
    const degenerate: Bbox = [-105.2, 40.0, -105.2, 40.0];
    const { w, h } = viewBoxDims(buildGeometrySvg(degenerate).viewBox);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
  });

  it('tolerates a Polygon with empty coordinates', () => {
    const empty = { type: 'Polygon', coordinates: [] } as GeoJsonPolygon;
    expect(buildGeometrySvg(BBOX, empty).polygonPaths).toEqual([]);
  });
});

// A polygon that fills BBOX, so its projected vertices sit inside the padded
// tile viewBox.
const BBOX_POLY: GeoJsonPolygon = {
  type: 'Polygon',
  coordinates: [[
    [-105.3, 39.9],
    [-105.1, 39.9],
    [-105.1, 40.1],
    [-105.3, 40.1],
    [-105.3, 39.9],
  ]],
};

function pathNumbers(d: string): number[] {
  return (d.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
}

// Extract the zoom from a slippy-map href regardless of host/path layout.
function tileZoom(href: string): number {
  const m = href.match(/\/(\d+)\/\d+\/\d+(?:[.@][\w.]+)?$/);
  return m ? Number(m[1]) : NaN;
}

describe('buildGeometryMap', () => {
  it('returns bounded tiles + a valid viewBox/aspect for a bbox alone', () => {
    const { viewBox, aspect, tiles, polygonPaths, attribution } = buildGeometryMap(BBOX);
    const { x, y, w, h } = viewBoxDims(viewBox);
    expect(x).toBe(0);
    expect(y).toBe(0);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
    expect(aspect).toBe(`${w} / ${h}`);
    expect(tiles.length).toBeGreaterThan(0);
    expect(tiles.length).toBeLessThanOrEqual(16);
    expect(polygonPaths).toEqual([]); // no geometry → tiles only
    expect(attribution).toMatch(/OpenStreetMap/);
  });

  it('emits proxy-relative tile hrefs with z/x/y substituted and z in range', () => {
    const { tiles } = buildGeometryMap(BBOX);
    for (const t of tiles) {
      expect(t.href).toMatch(/^\/api\/map_tiles\/raster\/\d+\/\d+\/\d+\.png$/);
      expect(t.size).toBe(256);
      const z = tileZoom(t.href);
      expect(z).toBeGreaterThanOrEqual(1);
      expect(z).toBeLessThanOrEqual(16);
    }
  });

  it('honors a custom tileUrl template', () => {
    const { tiles } = buildGeometryMap(BBOX, undefined, {
      tileUrl: 'https://tiles.example.com/{z}/{x}/{y}@2x.png',
    });
    expect(tiles[0].href).toMatch(/^https:\/\/tiles\.example\.com\/\d+\/\d+\/\d+@2x\.png$/);
  });

  it('picks a higher zoom (more detail) for a smaller bbox', () => {
    const small: Bbox = [-94.40, 37.70, -94.38, 37.72];
    const big: Bbox = [-100, 30, -90, 40];
    const zOf = (b: Bbox) => tileZoom(buildGeometryMap(b).tiles[0].href);
    expect(zOf(small)).toBeGreaterThan(zOf(big));
  });

  it('projects the polygon into the tile viewBox (paths inside bounds)', () => {
    const { viewBox, polygonPaths } = buildGeometryMap(BBOX, BBOX_POLY);
    expect(polygonPaths).toHaveLength(1);
    const { w, h } = viewBoxDims(viewBox);
    const nums = pathNumbers(polygonPaths[0]);
    for (let i = 0; i < nums.length; i += 2) {
      const px = nums[i];
      const py = nums[i + 1];
      // bbox sits inside the padded tile viewBox, so every vertex is interior.
      expect(px).toBeGreaterThanOrEqual(0);
      expect(px).toBeLessThanOrEqual(w);
      expect(py).toBeGreaterThanOrEqual(0);
      expect(py).toBeLessThanOrEqual(h);
    }
  });

  it('builds one path per polygon for a MultiPolygon', () => {
    const multi: GeoJsonMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [[[-105.3, 39.9], [-105.2, 39.9], [-105.2, 40.0], [-105.3, 39.9]]],
        [[[-105.2, 40.0], [-105.1, 40.0], [-105.1, 40.1], [-105.2, 40.0]]],
      ],
    };
    expect(buildGeometryMap(BBOX, multi).polygonPaths).toHaveLength(2);
  });

  it('returns tiles but no paths for unknown geometry', () => {
    const point = { type: 'Point', coordinates: [-94.4, 37.7] } as unknown as GeoJsonGeometry;
    const out = buildGeometryMap(BBOX, point);
    expect(out.polygonPaths).toEqual([]);
    expect(out.tiles.length).toBeGreaterThan(0);
  });

  it('clamps a degenerate bbox without throwing', () => {
    const degenerate: Bbox = [-94.4, 37.7, -94.4, 37.7];
    expect(() => buildGeometryMap(degenerate)).not.toThrow();
    const { w, h } = viewBoxDims(buildGeometryMap(degenerate).viewBox);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
  });

  it('defaults to the HA map_tiles proxy and credits OSM contributors', () => {
    expect(DEFAULT_TILE_URL).toContain('{z}/{x}/{y}');
    expect(DEFAULT_TILE_URL).toContain('/api/map_tiles/raster/');
    expect(DEFAULT_TILE_ATTRIBUTION).toBe('© OpenStreetMap contributors');
  });
});

describe('mapTilesUrl', () => {
  it('builds the base-plus-token template and keeps z/x/y tokens', () => {
    const url = mapTilesUrl('http://homeassistant.local:8123', 'abc123');
    expect(url).toBe('http://homeassistant.local:8123/api/map_tiles/raster/{z}/{x}/{y}.png?token=abc123');
    const { tiles } = buildGeometryMap(BBOX, undefined, { tileUrl: url });
    expect(tiles[0].href).toMatch(/^http:\/\/homeassistant\.local:8123\/api\/map_tiles\/raster\/\d+\/\d+\/\d+\.png\?token=abc123$/);
  });

  it('strips a trailing slash from the base and falls back to a relative path', () => {
    expect(mapTilesUrl('https://example.ui.nabu.casa/', 't')).toBe(
      'https://example.ui.nabu.casa/api/map_tiles/raster/{z}/{x}/{y}.png?token=t',
    );
    expect(mapTilesUrl(undefined, 't')).toBe('/api/map_tiles/raster/{z}/{x}/{y}.png?token=t');
  });

  it('URL-encodes the token', () => {
    expect(mapTilesUrl('', 'a b&c')).toContain('?token=a%20b%26c');
  });
});

describe('fetchMapTilesToken', () => {
  const conn = (impl: (msg: { type: string }) => Promise<unknown>) =>
    ({ sendMessagePromise: impl } as unknown as Parameters<typeof fetchMapTilesToken>[0]);

  it('sends map_tiles/access_token and returns the token', async () => {
    const seen: string[] = [];
    const token = await fetchMapTilesToken(conn(async (msg) => {
      seen.push(msg.type);
      return { token: 'deadbeef' };
    }));
    expect(seen).toEqual(['map_tiles/access_token']);
    expect(token).toBe('deadbeef');
  });

  it('resolves null (never rejects) on an unknown command or a malformed reply', async () => {
    await expect(fetchMapTilesToken(conn(async () => { throw new Error('unknown_command'); })))
      .resolves.toBeNull();
    await expect(fetchMapTilesToken(conn(async () => ({})))).resolves.toBeNull();
    await expect(fetchMapTilesToken(conn(async () => ({ token: '' })))).resolves.toBeNull();
  });
});
