// @ts-ignore
import { regionData, TextToCode} from 'element-china-area-data';

const regionMap = {};
const makeRegionMap = (node:{name:string, value:string, children:[]}) => {
  // @ts-ignore
  regionMap[node.value] = node;

  if(node.children){
    // eslint-disable-next-line no-restricted-syntax
    for (const children of node.children) {
      // @ts-ignore
      children.parent = node;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      makeRegionMap(children);
    }
  }
};

// eslint-disable-next-line no-restricted-syntax
for(const region of regionData){
  region.parent = null;
  makeRegionMap(region);
}

const codeToText = (code: string|undefined) => {
  if(!code)return []
  const res = []
  do{
    // @ts-ignore
    res.push(regionMap[code].label);
    // @ts-ignore
    code = regionMap[code].parent?.value
    // @ts-ignore
  } while (regionMap[code]);
  return res.reverse();
};

const textToCode = (text: string|undefined) => {
  if(!text)return null
  const items = text.split('/')
  let region = TextToCode
  // eslint-disable-next-line no-restricted-syntax
  for(const item of items){
    region = region[item]
  }
  return region.code
};

// eslint-disable-next-line import/prefer-default-export
export { codeToText, textToCode };
