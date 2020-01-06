import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FaHotjar, FaList, FaChartBar, FaTrophy, FaStar, FaNewspaper } from 'react-icons/fa';

class SortList extends React.Component<{}, {}> {
  state = {};
  render(): JSX.Element {
    return (
      <ListGroup>
        <ListGroupItem>
          <a href={'#'}>
            <FaHotjar className={'sort-icon'} />
            Hot
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href={'#'}>
            <FaList className={'sort-icon'} />
            New
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href={'#'}>
            <FaChartBar className={'sort-icon'} />
            Rising
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href={'#'}>
            <FaTrophy className={'sort-icon'} />
            Top
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href={'#'}>
            <FaStar className={'sort-icon'} />
            Best
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a href={'#'}>
            <FaNewspaper className={'sort-icon'} />
            Controversial
          </a>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default SortList;
