import { createClient } from '@supabase/supabase-js';
import { APIOutput } from '../types';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

interface CacheRecord extends APIOutput {
  url: string;
}

const checkForCache = async (url: string): Promise<APIOutput | null> => {
  try {
    let { data, error } = await supabase
      .from('meta-cache')
      .select('*')
      .eq('url', url);

    if (error) {
      console.log(error);
      return null;
    }

    if (data) {
      return data[0] as unknown as APIOutput;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createCache = async (data: CacheRecord): Promise<boolean> => {
  try {
    await supabase.from('meta-cache').insert(data);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { checkForCache, createCache };
