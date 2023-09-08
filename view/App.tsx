import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';

let i = 0;
type Props = {
  serverData?: {
    name: string;
  };
};
export function App(props: Props) {
  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log(i++, props);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return <div>Component {JSON.stringify(props)}</div>;
}

// @ts-ignore
if (typeof document !== 'undefined') {
  // @ts-ignore
  const dc = document as any;
  const data = JSON.parse(dc.getElementById('__SERVER_PROPS__')?.textContent);

  hydrateRoot(dc.getElementById('app'), <App serverData={data.serverData} />);
}
