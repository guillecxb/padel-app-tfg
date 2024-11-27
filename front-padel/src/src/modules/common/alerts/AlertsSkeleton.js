import { Stack, Skeleton } from "@mui/material";

const AlertsSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton height={100} width={"50%"} />
      <Skeleton height={100} width={"50%"} />
    </Stack>
  );
};

AlertsSkeleton.propTypes = {};

export default AlertsSkeleton;
