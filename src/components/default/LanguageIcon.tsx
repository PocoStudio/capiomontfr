import {
  SiPython,
  SiFlask,
  SiJavascript,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiCloudflare,
  SiSynology
} from 'react-icons/si';
import { FaWindows} from 'react-icons/fa';
import { Code, Brain, Key } from 'lucide-react';

interface Props {
  name: string;
}

const iconSize = "w-4 h-4";

export const LanguageIcon = ({ name }: Props) => {
  const normalizedName = name.toLowerCase();

  switch (normalizedName) {
    case 'python':
      return <SiPython className={`${iconSize} text-blue-400`} />;
    case 'flask':
      return <SiFlask className={`${iconSize} text-gray-400`} />;
    case 'javascript':
      return <SiJavascript className={`w-3 h-3 text-yellow-400`} />;
    case 'docker':
      return <SiDocker className={`${iconSize} text-blue-500`} />;
    case 'html/css':
      return <SiHtml5 className={`${iconSize} text-orange-500`} />;
    case 'css':
      return <SiCss3 className={`${iconSize} text-blue-400`} />;
    case 'cloudflare':
      return <SiCloudflare className={`${iconSize} text-orange-400`} />;
    case 'windows':
      return <FaWindows className={`${iconSize} text-sky-400`} />;
    case 'ia':
      return <Brain className={`${iconSize} text-pink-400`} />;
    case 'aes-256':
      return <Key className={`${iconSize} text-yellow-500`} />;
    case 'synology':
      return <SiSynology className={`${iconSize} text-blue-500`} />;
    default:
      return <Code className={`${iconSize} text-gray-400`} />;
  }
};