import React, { SFC } from 'react';
import { CardHeader, CardFooter, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as type from '../../types';
import { FaReddit } from 'react-icons/fa';

export interface CardComponentProps {
  item: type.Story;
}

const CardComponent: SFC<CardComponentProps> = (props: CardComponentProps) => {
  console.log(props.item.data);
  const { item } = props;
  const { data } = item;
  const { author, id, score, title, url, thumbnail, subreddit_name_prefixed } = data;
  return (
    <div className={'card-container'}>
      <Card>
        <CardHeader>
          <FaReddit color={'#ff4500'} size={25} /> - {subreddit_name_prefixed} - Posted by {author}
        </CardHeader>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{score}</CardSubtitle>
          {/*<CardText>
            Some quick example text to build on the card title and make up the bulk of the card&apos;s content.
          </CardText>
          <Button>Button</Button> */}
        </CardBody>
        <CardImg top width="100%" src={thumbnail} alt="Card image cap" />
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  );
};

export default CardComponent;
