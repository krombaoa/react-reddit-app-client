import React, { SFC, useState } from 'react';
import axios from 'axios';
import { Row, Col, CardHeader, CardFooter, Card, CardImg, CardBody, CardTitle, Collapse } from 'reactstrap';
import * as type from '../../types';
import { FaReddit, FaCaretUp, FaCaretDown, FaCommentAlt, FaShare, FaStar } from 'react-icons/fa';

export interface CardComponentProps {
  item: type.Story;
  popUpModal: Function;
  popUpModalState: boolean;
}

const CardComponent: SFC<CardComponentProps> = (props: CardComponentProps) => {
  const { item, popUpModal, popUpModalState } = props;
  const { data } = item;
  const { author, num_comments, score, title, thumbnail, subreddit_name_prefixed, permalink, url } = data;
  const thumbnailExists = thumbnail.includes('https') || thumbnail.includes('http');

  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState({ loaded: false, data: [] })

  const axiosClient = () => {
    if (!comment.loaded) {
      axios.get(`https://www.reddit.com/${permalink}.json?limit=15`).then(response => {
        setComment({ loaded: true, data: response.data[1].data.children })
      });
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className={'card-container'}>
      <Card>
        <CardHeader>
          <FaReddit color={'#ff4500'} size={25} /> ・ {subreddit_name_prefixed} ・ Posted by {author}
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <CardTitle className={'clickable'} onClick={() => popUpModal({ modal: !popUpModalState, data })}>{title}</CardTitle>
            </Col>
            {thumbnailExists ? <Col xs="4" sm="2"> <CardImg top width="100%" src={thumbnail} alt="Reddit Image" /></Col> : <></>}
          </Row>
        </CardBody>
        <CardFooter>
          <Row>
            <Col><FaCaretUp /> {score} <FaCaretDown /></Col>
            <Col className={'clickable'} onClick={axiosClient}><FaCommentAlt /> {num_comments} comments</Col>
            <Col><a href={`https://www.reddit.com/${permalink}`} target={'_blank'}><FaShare /> share </a></Col>
            <Col><FaStar /> award </Col>
          </Row>
        </CardFooter>
      </Card>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {num_comments !== 0 && comment.data !== []
              ? comment.data.map((item: type.Comment, key: number) => (
                item.kind === 't1' ?
                  < div key={key} >
                    <p><em>Posted b=y {item.data.author}</em></p>
                    <p><strong>{item.data.body}</strong></p>
                    <hr />
                  </div> : <p className={'clickable'} onClick={() => popUpModal({ modal: !popUpModalState, data })}>more</p>
              ))
              : <p>no comment</p>}
          </CardBody>
        </Card>
      </Collapse>
    </div >
  );
};

export default CardComponent;
