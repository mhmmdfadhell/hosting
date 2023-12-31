import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = ({ visible }) => {
  return (
    <div>
      {visible && (
        <>
          <hr style={{ width: "100%", height: "3px" }} />
          <Container>
            <div className="content-footer">
              <Row>
                <Col md={3}>
                  <h5>FEATURES</h5>
                  Reviews
                  <br />
                  Community
                  <br />
                  Social Media Kit
                  <br />
                  Affiliate
                </Col>
                <Col md={3}>
                  <h5>ACCOUNT</h5>
                  Refund
                  <br />
                  Security
                  <br />
                  Rewards
                </Col>
                <Col md={3}>
                  <h5>COMPANY</h5>
                  Career
                  <br />
                  Help Center
                  <br />
                  Media
                </Col>

                <Col md={3}>
                  <h5>Get Connected</h5>
                  Jakarta
                  <br />
                  Indonesia
                  <br />
                  0212 - 2558 - 5133
                  <br />
                  DancingGoat@gmail.com
                </Col>
              </Row>
            </div>
          </Container>
          <hr style={{ width: "100%", height: "3px" }} />
          <div className="text-muted text-center mb-3">
            2023 Copyright © DancingGoat • All rights reserved • Made in Jakarta
          </div>
        </>
      )}
    </div>
  );
};

Footer.defaultProps = {
  visible: true,
};

export default Footer;
