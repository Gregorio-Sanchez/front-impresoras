
import { FadeLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import styles from '../../styles/spinner.module.css'

const override = {
    display: "flex",
    margin: "0 auto",
};

export const Spinner = ({ loading }) => {

    return (
        <div className={loading ? styles.parentDisable : ''} width="100%">
            <div className='styles.overlay-box'>
                <FadeLoader
                    color={"#FACD01"}
                    loading={loading}
                    cssOverride={override}
                    size={90}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

Spinner.propTypes = {
    loading: PropTypes.bool,
}