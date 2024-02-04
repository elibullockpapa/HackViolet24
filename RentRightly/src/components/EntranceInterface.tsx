import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/joy';

function EntranceInterface() {
  const navigate = useNavigate();

  const handleRenterClick = () => {
    navigate("/renter");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography sx={{ position: 'absolute', top: 10, left: 10 }}>
        RentRightly
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="solid" color="primary" onClick={handleRenterClick}>
          Renter
        </Button>
        <Button variant="solid" color="primary">
          Landlord
        </Button>
      </Stack>
    </Box>
  );
}

export default EntranceInterface;
