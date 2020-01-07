import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FaHotjar, FaList, FaChartBar, FaTrophy, FaStar, FaNewspaper } from 'react-icons/fa';

export interface SortListProps {
  sortSelected: Function;
}

const SortList: React.SFC<SortListProps> = (props: SortListProps) => {
  const { sortSelected } = props;
  return (
    <ListGroup>
      <ListGroupItem onClick={(): void => sortSelected('hot')}>
        <FaHotjar className={'clickable sort-icon'} />
        Hot
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('new')}>
        <FaList className={'clickable sort-icon'} />
        New
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('rising')}>
        <FaChartBar className={'clickable sort-icon'} />
        Rising
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('top')}>
        <FaTrophy className={'clickable sort-icon'} />
        Top
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('best')}>
        <FaStar className={'clickable sort-icon'} />
        Best
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('controversial')}>
        <FaNewspaper className={'clickable sort-icon'} />
        Controversial
      </ListGroupItem>
    </ListGroup>
  );
};

export default SortList;
