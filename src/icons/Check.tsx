import { SvgIcon } from '@mui/material';

type Props = {
  fill: string;
};
const Check = ({ fill = 'currentColor' }: Props) => {
  return (
    <SvgIcon>
      <svg
        fill="none"
        height="24"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </SvgIcon>
  );
};

export default Check;
