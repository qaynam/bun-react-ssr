import { renderToString } from 'react-dom/server';
import { App } from './App';

export const getSSRString = (params?: {
  serverData: {
    name: string;
  };
}) => renderToString(<App serverData={params?.serverData} />);
