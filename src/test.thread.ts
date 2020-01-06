import { expose } from 'threads/worker';
import { Observable } from 'observable-fns';

import * as util from 'util';

import * as fs from 'fs';
import * as zlib from 'zlib';

expose({
    testMethod(): Observable<number> {
        return new Observable((observer) => {
            const s = fs.createWriteStream('./test.txt');
            const zs = zlib.createDeflate();
            zs.write('abcdefg', () => zs.end());
            zs.pipe(s);
            let count = 0;
            const timer = setInterval(() => {
                count++;
                observer.next(count);
                if (count == 3) {
                    clearInterval(timer);
                    observer.complete();
                }
            }, 1000);
        });
    }
});
