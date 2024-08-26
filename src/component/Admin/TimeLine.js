import React from 'react';
import PropTypes from 'prop-types';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

const CustomTimeline = ({ actions }) => {
  return (
    <Timeline>
      {actions.map((action, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot 
              color={action.type === 'create' ? 'primary' : action.type === 'update' ? 'secondary' : 'error'} 
            />
            {index < actions.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2" color="text.secondary">
              {action.type === 'create' && `Created orchid: ${action.data.name}`}
              {action.type === 'update' && `Updated orchid: ${action.data.name}`}
              {action.type === 'delete' && `Deleted orchid: ${action.data.name}`}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

CustomTimeline.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['create', 'update', 'delete']).isRequired,
      data: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default CustomTimeline;
