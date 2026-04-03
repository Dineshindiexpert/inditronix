'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { apiService } from '../../api/auth/Endpoint';


const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm();

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await apiService.getloginuser(1);
        const data = res.data;

        setProfile(data);

        reset({
          firstname: data.name?.firstname || '',
          nickname: data.username || '',
          gender: 'male',
          language: 'en-US',
          time: 'EST',
          contact: data.phone || '',
          country: data.address?.country || 'USA'
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchuser();
  }, [reset]);

  const handleOnSubmit = (data) => {
    console.log("Updated:", data);
  };

   

  return (
    <Container className="mt-4">
 

      {/*  PROFILE HEADER */}
      <Card className="p-4 mb-4 border-0 shadow-lg profile-card">
        <Row className="align-items-center">

          <Col md={3} className="text-center">
            <img
              src="https://i.pravatar.cc/150"
              alt="avatar"
              className="profile-img"
            />
          </Col>

          <Col md={9}>
            <div className="d-flex align-items-center gap-3 mb-2">
              <h3 className="mb-0">{profile.username}</h3>
              <Button variant="dark" size="sm">
                Edit Profile
              </Button>
            </div>

          

            <div>
              <strong>{profile.name?.firstname}</strong>
              <p className="mb-0 text-muted">{profile.email}</p>
            </div>
          </Col>

        </Row>
      </Card>

      {/*  FORM CARD */}
      <Card className="p-4 border-0 shadow-lg profile-card">
        <Form onSubmit={handleSubmit(handleOnSubmit)}>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...register("firstname", {
                    required: "First name is required"
                  })}
                />
                <small className="text-danger">{errors.firstname?.message}</small>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  {...register("nickname", {
                    required: "Nickname is required"
                  })}
                />
                <small className="text-danger">{errors.nickname?.message}</small>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select {...register("gender")}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  {...register("contact", {
                    required: "Contact required"
                  })}
                />
                <small className="text-danger">{errors.contact?.message}</small>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Select {...register("country")}>
                  <option>India</option>
                  <option>USA</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select {...register("language")}>
                  <option>English</option>
                  <option>Hindi</option>
                </Form.Select>
              </Form.Group>
            </Col>

          </Row>

          <div className="text-end mt-3">
            <Button className="px-4" type="submit" variant="dark">
              Save Changes
            </Button>
          </div>

        </Form>
      </Card>

    </Container>
  );
};

export default Profile;