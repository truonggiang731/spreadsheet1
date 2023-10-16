import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxConverterService {
  stox(wb: any): any[] {
    const out: any[] = [];
    wb.SheetNames.forEach(function (name: any) {
      const o: any = { name: name, rows: {} };
      const ws = wb.Sheets[name];
      if (!ws || !ws['!ref']) return;
      const range = XLSX.utils.decode_range(ws['!ref']);
      // sheet_to_json will lost empty row and col at begin as default
      range.s = { r: 0, c: 0 };
      const aoa = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: 1,
        range: range
      });

      aoa.forEach(function (r: any, i: any) {
        const cells: any = {};
        r.forEach(function (c: any, j: any) {
          cells[j] = { text: c || String(c) };

          const cellRef = XLSX.utils.encode_cell({ r: i, c: j });

          if (ws[cellRef] != null && ws[cellRef].f != null) {
            cells[j].text = '=' + ws[cellRef].f;
          }
        });
        o.rows[i] = { cells: cells };
      });
      o.rows.len = aoa.length;

      o.merges = [];
      (ws['!merges'] || []).forEach(function (merge: any, i: any) {
        // Needed to support merged cells with empty content
        if (o.rows[merge.s.r] == null) {
          o.rows[merge.s.r] = { cells: {} };
        }
        if (o.rows[merge.s.r].cells[merge.s.c] == null) {
          o.rows[merge.s.r].cells[merge.s.c] = {};
        }

        o.rows[merge.s.r].cells[merge.s.c].merge = [merge.e.r - merge.s.r, merge.e.c - merge.s.c];

        o.merges[i] = XLSX.utils.encode_range(merge);
      });

      out.push(o);
    });

    return out;
  }

  xtos(sdata: any): any {
    const out = XLSX.utils.book_new();
    sdata.forEach(function (xws: any) {
      const ws: any = {};
      const rowobj = xws.rows;
      let minCoord: any = { r: 0, c: 0 },
        maxCoord: any = { r: 0, c: 0 };
      for (let ri = 0; ri < rowobj.len; ++ri) {
        const row = rowobj[ri];
        if (!row) continue;

        Object.keys(row.cells).forEach(function (k) {
          const idx = +k;
          if (isNaN(idx)) return;

          const lastRef = XLSX.utils.encode_cell({ r: ri, c: idx });
          if (ri > maxCoord.r) maxCoord.r = ri;
          if (idx > maxCoord.c) maxCoord.c = idx;

          let cellText: any = row.cells[k].text,
            type: string = 's';
          if (!cellText) {
            cellText = '';
            type = 'z';
          } else if (!isNaN(Number(cellText))) {
            cellText = Number(cellText);
            type = 'n';
          } else if (cellText.toLowerCase() === 'true' || cellText.toLowerCase() === 'false') {
            cellText = Boolean(cellText);
            type = 'b';
          }

          ws[lastRef] = { v: cellText, t: type };

          if (type == 's' && cellText[0] == '=') {
            ws[lastRef].f = cellText.slice(1);
          }

          if (row.cells[k].merge != null) {
            if (ws['!merges'] == null) ws['!merges'] = [];

            ws['!merges'].push({
              s: { r: ri, c: idx },
              e: {
                r: ri + row.cells[k].merge[0],
                c: idx + row.cells[k].merge[1]
              }
            });
          }
        });
      }
      ws['!ref'] = minCoord ? XLSX.utils.encode_range({
        s: minCoord,
        e: maxCoord
      }) : 'A1';

      XLSX.utils.book_append_sheet(out, ws, xws.name);
    });

    return out;
  }
}
