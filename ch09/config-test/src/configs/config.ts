import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';
import { readFile, readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;

let conf = {}; //phase의 값에 따라서 적절한 환경 변수값을 conf에 저장
if (phase == 'local') {
  conf = local;
} else if (phase == 'dev') {
  conf = dev;
} else if (phase == 'prod') {
  conf = prod;
}

const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf-8'),
);
//common과 conf에서 받은 값을 합쳐서 결괏값 으로 주는 함수 반환
//load 옵션에서는 ()=>({}) 형태로 값을 주어야 하므로 ()=>()로 객체를 한 번 감싸준다
export default () => ({
  ...common,
  ...conf,
  ...yamlConfig,
});
