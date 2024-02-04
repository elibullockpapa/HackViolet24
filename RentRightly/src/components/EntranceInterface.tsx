import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/joy';

function EntranceInterface() {
  const navigate = useNavigate();

  const handleRenterClick = () => {
    navigate("/renter");
  };

  const handleLandlordClick = () => {
    navigate("/landlord");
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
      <Typography level="h4" variant="outlined" color="primary" sx={{ position: 'absolute', top: 15, left: 25 }}>
        RentRightly
      </Typography>
      <Typography level="h1" sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        Who are you?
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="solid" color="primary" onClick={handleRenterClick}>
          Renter
        </Button>
        <Button variant="solid" color="primary" onClick={handleLandlordClick}>
          Landlord
        </Button>
      </Stack>
    </Box>
  );
}

export default EntranceInterface;
