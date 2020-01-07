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
      <ListGroupItem onClick={(): void => sortSelected('hot')} className={'clickable'}>
        <FaHotjar className={'sort-icon'} />
        Hot
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('new')} className={'clickable'}>
        <FaList className={'sort-icon'} />
        New
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('rising')} className={'clickable'}>
        <FaChartBar className={'sort-icon'} />
        Rising
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('top')} className={'clickable'}>
        <FaTrophy className={'sort-icon'} />
        Top
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('best')} className={'clickable'}>
        <FaStar className={'sort-icon'} />
        Best
      </ListGroupItem>
      <ListGroupItem onClick={(): void => sortSelected('controversial')} className={'clickable'}>
        <FaNewspaper className={'sort-icon'} />
        Controversial
      </ListGroupItem>
    </ListGroup>
  );
};

export default SortList;
