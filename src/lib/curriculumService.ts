import { MasterCurriculum, CurriculumModule, CurriculumLevel } from '@/types';

let cachedCurriculum: MasterCurriculum | null = null;

export async function fetchMasterCurriculum(): Promise<MasterCurriculum> {
  if (cachedCurriculum) {
    return cachedCurriculum;
  }

  try {
    const res = await fetch('/data/master_bootcamp_curriculum.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to load curriculum: ${res.status} ${res.statusText}`);
    }

    const data: MasterCurriculum = await res.json();
    cachedCurriculum = data;
    return data;
  } catch (error) {
    console.error('Error fetching master curriculum JSON:', error);
    throw error;
  }
}

export function getLevelForWeek(weekNumber: number, levels: CurriculumLevel[]): CurriculumLevel | undefined {
  return levels.find(lvl => lvl.weeks.includes(weekNumber));
}

export function getModuleByWeek(weekNumber: number, modules: CurriculumModule[]): CurriculumModule | undefined {
  return modules.find(m => m.week === weekNumber);
}