import { CSSProperties } from "react";

export default function SitemarkIcon() {

  const logoStyle: CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '24x',
    fontWeight: 500,
    color: '#4A90E2',
    textTransform: 'uppercase',
    paddingRight: '30px'
  };

  return (
    <div style={logoStyle}>
      gmDB
    </div>
  );
}
