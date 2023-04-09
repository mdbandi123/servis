import * as React from 'react';
import { motion } from 'framer-motion';

function SlideDown(props) {
    return (
        <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0, transition: { duration: 0.4 } }}>
            { props.children }
        </motion.div>
    );
}

export default SlideDown;