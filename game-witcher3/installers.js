"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMixed = exports.testSupportedMixed = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("./common");
function testSupportedMixed(files, gameId) {
    if (gameId !== common_1.GAME_ID) {
        return Promise.resolve({ supported: false, requiredFiles: [] });
    }
    const hasConfigMatrixFile = files.find(file => path_1.default.basename(file).toLowerCase === common_1.CONFIG_MATRIX_REL_PATH) !== undefined;
    if (hasConfigMatrixFile) {
        return Promise.resolve({ supported: false, requiredFiles: [] });
    }
    const hasPrefix = (prefix, fileEntry) => {
        const segments = fileEntry.toLowerCase().split(path_1.default.sep);
        if (segments.indexOf('content') !== 1) {
            return false;
        }
        return (segments[0].length > 3) && (segments[0].startsWith(prefix));
    };
    const supported = ((files.find(file => hasPrefix('dlc', file)) !== undefined)
        && (files.find(file => hasPrefix('mod', file)) !== undefined));
    return Promise.resolve({
        supported,
        requiredFiles: [],
    });
}
exports.testSupportedMixed = testSupportedMixed;
function installMixed(files) {
    const modNames = [];
    const instructions = files.reduce((accum, iter) => {
        const segments = iter.split(path_1.default.sep);
        if (!path_1.default.extname(segments[segments.length - 1])) {
            return accum;
        }
        const modName = segments[0].startsWith('mod')
            ? segments[0] : undefined;
        const destination = (segments[0].startsWith('dlc'))
            ? ['DLC'].concat(segments).join(path_1.default.sep)
            : (modName !== undefined)
                ? ['Mods'].concat(segments).join(path_1.default.sep)
                : undefined;
        if (destination !== undefined) {
            if (modName !== undefined) {
                modNames.push(modName);
            }
            const instruction = {
                type: 'copy',
                source: iter,
                destination,
            };
            accum.push(instruction);
        }
        return accum;
    }, [])
        .concat({
        type: 'attribute',
        key: 'modComponents',
        value: modNames,
    });
    return Promise.resolve({ instructions });
}
exports.installMixed = installMixed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc3RhbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLHFDQUEyRDtBQUkzRCxTQUFnQixrQkFBa0IsQ0FBQyxLQUFlLEVBQUUsTUFBYztJQUNoRSxJQUFJLE1BQU0sS0FBSyxnQkFBTyxFQUFFO1FBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDakU7SUFFRCxNQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSywrQkFBc0IsQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUN6SCxJQUFJLG1CQUFtQixFQUFFO1FBQ3ZCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDakU7SUFFRCxNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQWtCLEVBQUUsU0FBaUIsRUFBRSxFQUFFO1FBQzFELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFJckMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztXQUMxRCxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMvRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsU0FBUztRQUNULGFBQWEsRUFBRSxFQUFFO0tBQ2xCLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1QkQsZ0RBNEJDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEtBQWU7SUFHMUMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBQzlCLE1BQU0sWUFBWSxHQUF5QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM1QixNQUFNLFdBQVcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoQixJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsTUFBTSxXQUFXLEdBQXVCO2dCQUN0QyxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsSUFBSTtnQkFDWixXQUFXO2FBQ1osQ0FBQztZQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDTCxNQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsV0FBVztRQUNqQixHQUFHLEVBQUUsZUFBZTtRQUNwQixLQUFLLEVBQUUsUUFBUTtLQUNoQixDQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFuQ0Qsb0NBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IHR5cGVzIH0gZnJvbSAndm9ydGV4LWFwaSc7XHJcbmltcG9ydCB7IENPTkZJR19NQVRSSVhfUkVMX1BBVEgsIEdBTUVfSUQgfSBmcm9tICcuL2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBQcmVmaXhUeXBlID0gJ2RsYycgfCAnbW9kJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0U3VwcG9ydGVkTWl4ZWQoZmlsZXM6IHN0cmluZ1tdLCBnYW1lSWQ6IHN0cmluZyk6IFByb21pc2U8dHlwZXMuSVN1cHBvcnRlZFJlc3VsdD4ge1xyXG4gIGlmIChnYW1lSWQgIT09IEdBTUVfSUQpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdXBwb3J0ZWQ6IGZhbHNlLCByZXF1aXJlZEZpbGVzOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhhc0NvbmZpZ01hdHJpeEZpbGUgPSBmaWxlcy5maW5kKGZpbGUgPT4gcGF0aC5iYXNlbmFtZShmaWxlKS50b0xvd2VyQ2FzZSA9PT0gQ09ORklHX01BVFJJWF9SRUxfUEFUSCkgIT09IHVuZGVmaW5lZDtcclxuICBpZiAoaGFzQ29uZmlnTWF0cml4RmlsZSkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN1cHBvcnRlZDogZmFsc2UsIHJlcXVpcmVkRmlsZXM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGFzUHJlZml4ID0gKHByZWZpeDogUHJlZml4VHlwZSwgZmlsZUVudHJ5OiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNlZ21lbnRzID0gZmlsZUVudHJ5LnRvTG93ZXJDYXNlKCkuc3BsaXQocGF0aC5zZXApO1xyXG4gICAgaWYgKHNlZ21lbnRzLmluZGV4T2YoJ2NvbnRlbnQnKSAhPT0gMSkge1xyXG4gICAgICAvLyBXZSBleHBlY3QgdGhlIGNvbnRlbnQgZm9sZGVyIHRvIGJlIG5lc3RlZCBvbmUgbGV2ZWwgYmVuZWF0aFxyXG4gICAgICAvLyAgdGhlIG1vZCdzIGZvbGRlciBlLmcuICdhcmNoaXZlLnppcC9kbGNNb2ROYW1lL2NvbnRlbnQvJyBvdGhlcndpc2VcclxuICAgICAgLy8gIGl0J3Mgc2ltcGx5IHRvbyB1bnJlbGlhYmxlIHRvIGF0dGVtcHQgdG8gZGV0ZWN0IHRoaXMgcGFja2FnaW5nIHBhdHRlcm4uXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKHNlZ21lbnRzWzBdLmxlbmd0aCA+IDMpICYmIChzZWdtZW50c1swXS5zdGFydHNXaXRoKHByZWZpeCkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN1cHBvcnRlZCA9ICgoZmlsZXMuZmluZChmaWxlID0+IGhhc1ByZWZpeCgnZGxjJywgZmlsZSkpICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICYmIChmaWxlcy5maW5kKGZpbGUgPT4gaGFzUHJlZml4KCdtb2QnLCBmaWxlKSkgIT09IHVuZGVmaW5lZCkpO1xyXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgc3VwcG9ydGVkLFxyXG4gICAgcmVxdWlyZWRGaWxlczogW10sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsTWl4ZWQoZmlsZXM6IHN0cmluZ1tdKSB7XHJcbiAgLy8gV2UgY2FuIG9ubHkgYXNzdW1lIHRoYXQgZmlsZXMgd2l0aCB0aGUgJ2RsYycgcHJlZml4IGdvIGluc2lkZSBkbGMgYW5kIGZpbGVzXHJcbiAgLy8gIHdpdGggdGhlICdtb2QnIHByZWZpeCBnbyBpbnNpZGUgbW9kcy5cclxuICBjb25zdCBtb2ROYW1lczogc3RyaW5nW10gPSBbXTtcclxuICBjb25zdCBpbnN0cnVjdGlvbnM6IHR5cGVzLklJbnN0cnVjdGlvbltdID0gZmlsZXMucmVkdWNlKChhY2N1bSwgaXRlcikgPT4ge1xyXG4gICAgY29uc3Qgc2VnbWVudHMgPSBpdGVyLnNwbGl0KHBhdGguc2VwKTtcclxuICAgIGlmICghcGF0aC5leHRuYW1lKHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdKSkge1xyXG4gICAgICByZXR1cm4gYWNjdW07XHJcbiAgICB9XHJcbiAgICBjb25zdCBtb2ROYW1lID0gc2VnbWVudHNbMF0uc3RhcnRzV2l0aCgnbW9kJylcclxuICAgICAgPyBzZWdtZW50c1swXSA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gKHNlZ21lbnRzWzBdLnN0YXJ0c1dpdGgoJ2RsYycpKVxyXG4gICAgICA/IFsnRExDJ10uY29uY2F0KHNlZ21lbnRzKS5qb2luKHBhdGguc2VwKVxyXG4gICAgICA6IChtb2ROYW1lICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgPyBbJ01vZHMnXS5jb25jYXQoc2VnbWVudHMpLmpvaW4ocGF0aC5zZXApXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoZGVzdGluYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAobW9kTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbW9kTmFtZXMucHVzaChtb2ROYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbjogdHlwZXMuSUluc3RydWN0aW9uID0ge1xyXG4gICAgICAgIHR5cGU6ICdjb3B5JyxcclxuICAgICAgICBzb3VyY2U6IGl0ZXIsXHJcbiAgICAgICAgZGVzdGluYXRpb24sXHJcbiAgICAgIH07XHJcbiAgICAgIGFjY3VtLnB1c2goaW5zdHJ1Y3Rpb24pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjY3VtO1xyXG4gIH0sIFtdKVxyXG4gIC5jb25jYXQoe1xyXG4gICAgdHlwZTogJ2F0dHJpYnV0ZScsXHJcbiAgICBrZXk6ICdtb2RDb21wb25lbnRzJyxcclxuICAgIHZhbHVlOiBtb2ROYW1lcyxcclxuICB9KTtcclxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgaW5zdHJ1Y3Rpb25zIH0pO1xyXG59XHJcbiJdfQ==