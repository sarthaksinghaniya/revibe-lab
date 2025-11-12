import axios from 'axios';

const nvidiaBase = 'https://api.nvidia.com/detect'; // placeholder URL – replace with actual
const generationBase = 'https://api.nvidia.com/generate'; // placeholder

export const detectMaterial = async (imageBase64: string) => {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY as string;
  if (!apiKey) throw new Error('NVIDIA API key missing');

  const resp = await axios.post(
    nvidiaBase,
    { image: imageBase64 },
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  return resp.data as { material: string; label: string };
};

export interface GenerateParams {
  material: string;
  category: string;
  complexity: 'Low' | 'Medium' | 'High';
  budget: number;
}

export const generateProjectIdeas = async (params: GenerateParams) => {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY as string;
  if (!apiKey) throw new Error('NVIDIA API key missing');

  const resp = await axios.post(
    generationBase,
    params,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  return resp.data as Array<{
    title: string;
    description: string;
    costEstimate: number;
    timeEstimate: string;
  }>;
};
