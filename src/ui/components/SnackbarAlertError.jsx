import PropTypes from 'prop-types';
import { forwardRef, memo } from 'react';
import { Snackbar, Stack, AlertTitle } from '@mui/material/';
import MuiAlert from '@mui/material/Alert';

export const SnackbarAlertError = memo(({ accion, alert, setAlert }) => {

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {           
            return;
        }
        setAlert(false);
    };

    return (
        <Stack spacing={2} >
            <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    <AlertTitle>{accion} INCORRECTA. HAY UN ERROR</AlertTitle>
                </Alert>
            </Snackbar>
        </Stack>
    )
})

SnackbarAlertError.displayName = 'SnackbarAlertAlert';

SnackbarAlertError.propTypes = {
    accion: PropTypes.string,
    alert: PropTypes.string,
    setAlert: PropTypes.func,
}
