import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicDateRangePicker from './DatePicker';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';
import { useSelect } from '@mui/lab/node_modules/@mui/base';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DownArrow from './DownArrow';
const moment = extendMoment(originalMoment);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: "none",
    borderRadius: "10px",
    p: 4,
};

export default function DateModal() {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const filterDate = useSelector((state) => state.leadsFilter.filterDate)

    const tempDate = moment().format("MMM DD, YYYY") + " to " + moment().add(7, "days").format("MMM DD, YYYY")

    const renderSelectionValue = () => {
        return (
            <div >

                {filterDate.start.format("MMM DD, YYYY")}
                <span style={{ padding: "5px" }}>{"to"}</span>
                {filterDate.end.format("MMM DD, YYYY")}
            </div>
        );
    };

    return (
        <div>
            <Button style={{ textTransform: "none", color: "#5C759A", backgroundColor: "#E7E7E7", borderRadius: "10px" }} onClick={handleOpen}>{filterDate === "" ? tempDate : renderSelectionValue()} <span style={{ paddingLeft: "8px", paddingTop: "3px" }}><Calendar /></span><span style={{ paddingLeft: "5px", paddingBottom: "3px" }}><DownArrow /></span></Button>

            <Modal sx={{ border: "none" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <BasicDateRangePicker />
                    </Typography>

                </Box>
            </Modal>
        </div>
    );
}