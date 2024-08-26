import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Container, Rating, Chip, Collapse, Typography, Avatar, Box, IconButton, Popover, MenuItem, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { fetchAllOrchid, fetchAllMess, deleteOrchid, addOrchid, updateOrchid, deleteMess } from '../../services/ListOrchid';
import { CSSTransition } from 'react-transition-group';
import DelModal from './DelModalOrchid';
import NewModal from './CreModalOrchid';
import UpdateModal from './EdModalOrchid';
import CustomTimeline from './TimeLine';
import { Col, Row } from 'react-bootstrap';
import SearchBar from './SearchBar';

const columns = [
  { id: 'name', label: '🌺Name'},
  { id: 'color', label: '🌈Color'},
  { id: 'origin', label: '🌎Origin'},
  { id: 'category', label: '📚Category'},
  { id: 'isSpecial', label: '✨Special'},
  { id: 'rating', label: '⭐Rating'},
  { id: 'blank', label: '' }
];

export default function StickyHeadTable() {
  const [open, setOpen] = useState(null);
  const [orchids, setOrchids] = useState([]);
  const [message, setMessage] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [showCre, setShowCre] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [showEd, setShowEd] = useState(false);
  const [actions, setActions] = useState([]); // New state to hold the actions for the timeline
  const [filteredOrchids, setFilteredOrchids] = useState([]); // State for filtered orchids


  useEffect(() => {
    const fetchAllOrchids = async () => {
      try {
        const response = await fetchAllOrchid();
        setOrchids(response.data);
        setFilteredOrchids(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrchids();
  }, []);

  useEffect(() => {
    const fetchAllMesss = async () => {
      try {
        const response = await fetchAllMess();
        setMessage(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMesss();
  }, []);

  const createOrchid = async (newItem) => {
    try {
      const response = await addOrchid(newItem);
      setOrchids([response.data, ...orchids]);
      setFilteredOrchids([response.data, ...orchids]); // Update filtered list as well
      handleCloseCre();
      toast.success('Create successful!', {
        position: 'bottom-right',
        theme: 'colored',
      });
      setActions([...actions, { type: 'create', data: response.data }]); // Add action to the timeline
    } catch (error) {
      console.error('There was an error creating the item:', error);
    }
  };

  const deleteOrchids = async (id) => {
    try {
      await deleteOrchid(id);
      const deletedOrchid = orchids.find((item) => item.id === id);
      setOrchids(orchids.filter((item) => item.id !== id));
      setFilteredOrchids(orchids.filter((item) => item.id !== id));
      toast.success('Delete successful!', {
        position: 'bottom-right',
        theme: 'colored',
      });
      setActions([...actions, { type: 'delete', data: deletedOrchid }]); // Add action to the timeline
    } catch (error) {
      console.error('There was an error deleting the item:', error);
    }
  };

  const deleteMessage = async (id) => {
    await deleteMess(id);
    setMessage(message.filter((msg) => msg.id !== id));
    toast.success('Message deleted!', {
      position: 'bottom-right',
      theme: 'colored',
    });
  };

  const updateOrchids = async (id, updatedData) => {
    try {
      const response = await updateOrchid(id, updatedData);
      const updatedOrchid = response.data;

      setOrchids((prevOrchids) =>
        prevOrchids.map((orchid) =>
          orchid.id === id ? updatedOrchid : orchid
        )
      );

      setFilteredOrchids((prevOrchids) =>
        prevOrchids.map((orchid) =>
          orchid.id === id ? updatedOrchid : orchid
        )
      );
      toast.success('Update successful!', {
        position: 'bottom-right',
        theme: 'colored',
      });
      setActions([...actions, { type: 'update', data: updatedOrchid }]); // Add action to the timeline
    } catch (error) {
      console.error('There was an error updating the item:', error);
      toast.error('Update failed. Please try again.', {
        position: 'bottom-right',
        theme: 'colored',
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleOpenMenu = (event, orchid) => {
    setExpandedRow(null); // Collapse the expanded row
    setOpen(event.currentTarget);
    setSelectedOrchid(orchid);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setExpandedRow(null);
  };

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  const handleCloseEd = () => setShowEd(false);
  const handleShowEd = () => setShowEd(true);

  const handleCloseCre = () => setShowCre(false);
  const handleShowCre = () => setShowCre(true);

  const handleSearch = (term) => {
  
    const filtered = orchids.filter(
      (orchid) =>
        orchid.name.toLowerCase().includes(term.toLowerCase()) ||
        orchid.color.toLowerCase().includes(term.toLowerCase()) ||
        orchid.origin.toLowerCase().includes(term.toLowerCase()) ||
        orchid.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrchids(filtered);
    setPage(0); // Reset page when searching
  };


  const renderCellContent = (columnId, value, orchid) => {
    if (columnId === 'name') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={value} src={orchid.image} />
          <Typography sx={{ marginLeft: 1 }}>{value}</Typography>
        </Box>
      );
    }
    if (columnId === 'rating') {
      return <Rating value={value} precision={0.5} readOnly />;
    }
    if (typeof value === 'boolean') {
      return (
        <Chip
          label={value ? 'Yes' : 'No'}
          color={value ? 'success' : 'error'}
          variant="outlined"
        />
      );
    }

    if (columnId === 'blank') {
      return (
        <IconButton onClick={(e) => handleOpenMenu(e, orchid)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </IconButton>
      );
    }
    return value;
  };

  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="page">
      <Container>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 7 }}>
        <SearchBar onSearch={handleSearch} />
        <Typography variant="h3" sx={{ fontFamily: "'Henny Penny', -apple-system, Roboto, Helvetica, sans-serif", fontWeight: 380, fontSize: '26px', display: { xs: 'none', sm: 'block' } }}>
            ~-List Orchids-~
          </Typography>
          
          <Button variant="contained" color="secondary" onClick={handleShowCre}>new Orchid</Button>

          <NewModal show={showCre} handleClose={handleCloseCre} createOrchid={createOrchid} />
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4, mb: 7 }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      <strong>{column.label}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrchids
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((orchid) => (
                    <React.Fragment key={orchid.id}>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={orchid.id}
                        onClick={() => handleRowClick(orchid.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {renderCellContent(column.id, orchid[column.id], orchid)}
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length}>
                          <Collapse in={expandedRow === orchid.id} timeout="auto" unmountOnExit>
                            <Typography variant="h6" style={{ margin: '10px' }} gutterBottom>
                              🔥 Description
                            </Typography>
                            <Typography variant="body2" style={{ margin: '10px' }}>
                              {orchid.description}
                            </Typography>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orchids.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              sx: { width: 140 },
            }}
          >
            <MenuItem onClick={() => { handleCloseMenu(); handleShowEd(); }}>
              <FontAwesomeIcon icon={faPenToSquare} size="xs" /> &nbsp; Edit
            </MenuItem>

            <MenuItem onClick={() => { handleCloseMenu(); handleShowDel(); }} sx={{ color: 'error.main' }}>
              <FontAwesomeIcon icon={faTrashCan} size="xs" /> &nbsp; Delete
            </MenuItem>
          </Popover>

          <DelModal
            show={showDel}
            handleClose={handleCloseDel}
            onDelete={() => deleteOrchids(selectedOrchid.id)}
            name={selectedOrchid ? selectedOrchid.name : ''}
            img={selectedOrchid ? selectedOrchid.image : ''}
            color={selectedOrchid ? selectedOrchid.color : ''}
            category={selectedOrchid ? selectedOrchid.category : ''}
            origin={selectedOrchid ? selectedOrchid.origin : ''}
            rating={selectedOrchid ? selectedOrchid.rating : 1}
          />

          <UpdateModal
            show={showEd}
            handleClose={handleCloseEd}
            onUpdate={updateOrchids}
            orchidData={selectedOrchid}
          />
        </Paper>

<Row md={1}>

<Col md={9}>
        <Typography variant="h3" sx={{ fontFamily: "'Henny Penny', -apple-system, Roboto, Helvetica, sans-serif", fontWeight: 380, fontSize: '26px' }}>
          -Contact-
        </Typography>
        <Paper sx={{ width: '100%', mt: 3, mb: 5 }}>
          <List>
            {message.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={message.name} src={message.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.email}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {message.name}
                        </Typography>
                        {` — ${message.message}`}
                      </React.Fragment>
                    }
                  />
                  <IconButton  aria-label="delete" onClick={() => deleteMessage(message.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </IconButton>
                </ListItem>
                {index < message.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
        </Col>

        <Col md={3}>
        {/* Timeline */}
        <Typography variant="h3" sx={{ fontFamily: "'Henny Penny', -apple-system, Roboto, Helvetica, sans-serif", fontWeight: 380, fontSize: '26px' }}>
          -Action Timeline-
        </Typography>
        <Paper sx={{ width: '100%', mt: 3, mb: 5 }}>
        <CustomTimeline actions={actions} />
        </Paper>
        </Col>
        </Row>
      </Container>
    </CSSTransition>
  );
}
