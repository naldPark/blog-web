export interface SandboxStatusItem {
  label: string;
  icon: string;
  color: string;
}
export const sandboxStatusItems: SandboxStatusItem[] = [
  {
    label: 'Running',
    icon: 'mdi-play',
    color: 'orange',
  },
  {
    label: 'Stop',
    icon: 'mdi-stop',
    color: '#FF0000',
  },
  {
    label: 'Start',
    icon: 'mdi-play',
    color: '#2391FF',
  },
  {
    label: 'Waiting',
    icon: 'mdi-circle-outline',
    color: '#FF9500',
  },
  {
    label: 'Stopping',
    icon: 'mdi-circle-outline',
    color: '#FF0000',
  },
  {
    label: 'Unknown',
    icon: 'mdi-circle-outline',
    color: '#868E96',
  },
];

const treeItems = [
  {
    title: 'Dockerfile',
  },
  {
    title: 'node_modules',
  },
  {
    title: 'dist',
    children: [
      {
        title: 'Pty.js',
        file: 'js',
      },
      {
        title: 'Socket.js',
        file: 'js',
      },
      {
        title: 'Pty.js',
        file: 'js',
      },
    ],
  },
  {
    title: 'src',
    children: [
      {
        title: 'Pty.ts',
        file: 'ts',
      },
      {
        title: 'Socket.ts',
        file: 'ts',
      },
      {
        title: 'Pty.ts',
        file: 'ts',
      },
    ],
  },
  {
    title: 'package-lock.json',
    file: 'json',
  },
  {
    title: 'tsconfig.json',
    file: 'json',
  },
  {
    title: 'package.json',
    file: 'json',
  },
];
