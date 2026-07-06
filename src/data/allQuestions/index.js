import { flattenSections } from '../helpers';
import { sectionMainList } from './sectionsPart1';
import { sectionSeniorReact, sectionMachineCoding, sectionCoreBatches } from './sectionsPart2';
import { sectionChecklists, sectionClosureDeep, sectionBasicJS } from './sectionsPart3';
import { sectionPython, sectionReactFundamentals, sectionReactScenarios } from './sectionsPart4';
import {
  sectionCodingStrings,
  sectionCodingArrays,
  sectionCodingJS,
  sectionArchitecture,
  sectionCssTechnical,
  sectionReactLevels,
} from './sectionsPart5';
import { sectionDuplicateScenarios, sectionParentChildDup } from './sectionsPart6';
import { sectionGapTopics } from './sectionsPart7';

export const ALL_SECTIONS = [
  sectionMainList,
  sectionSeniorReact,
  sectionMachineCoding,
  sectionCoreBatches,
  sectionChecklists,
  sectionClosureDeep,
  sectionBasicJS,
  sectionPython,
  sectionReactFundamentals,
  sectionReactScenarios,
  sectionDuplicateScenarios,
  sectionParentChildDup,
  sectionGapTopics,
  sectionCodingStrings,
  sectionCodingArrays,
  sectionCodingJS,
  sectionArchitecture,
  sectionCssTechnical,
  sectionReactLevels,
];

export const ALL_QUESTIONS_FLAT = flattenSections(ALL_SECTIONS);
