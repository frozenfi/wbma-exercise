import {Text, Card, ListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';

const Single = ({route}) => {
  
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
  } = route.params;
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Card.Image source={{uri: uploadUrl + filename}} />
      <ListItem>
        <Text>{description}</Text>
      </ListItem>
      <ListItem>
        <Text>Uploaded at: {timeAdded}</Text>
      </ListItem>
      <ListItem>
        <Text>Uploaded by: {userId}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
