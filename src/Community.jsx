import React, { useState } from 'react';
import { ListItem, ListItemText, Divider, Modal } from '@material-ui/core/';

import DataModal from './DataModal.jsx';


const Community = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}>
        <DataModal
          name={props.community.name}
          data={props.community.parameters}
        />
      </Modal>
      <ListItem button onClick={handleOpen}>
        <ListItemText primary={props.community.name} />
        <ListItemText
          secondaryTypographyProps={{ align: "right" }}
          secondary={props.community.country}
        />
      </ListItem>
      <Divider />
    </div>
  );
};

export default Community;