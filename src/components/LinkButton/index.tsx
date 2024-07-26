import { Link } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

type LinkButtonProps = {
  label: string;
  linkTo: string;
};

export const LinkButton = ({ label, linkTo }: LinkButtonProps) => {
  return (
    <div className="flex w-full justify-center">
      <Button variant="link">
        <Link to={linkTo}>{label}</Link>
      </Button>
    </div>
  );
};
