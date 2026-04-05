'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { apiService } from '../../api/auth/Endpoint';
import Loading from '../components/loading';
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState("/logo.PNG"); // fallback

  const { formState: { errors }, register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await apiService.getUserById(userId);
        const data = res.data;
        setProfile(data);
        setAvatarSrc(data.avatar || "/logo.PNG");

        reset({
          name: data.name || 'not found ',
          nickname: data.email || 'not found',
          gender: data.gender || 'male',
          language: data.language || 'Hindi',
          country: data.country || 'India'
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [reset]);

  const handleOnSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("User not found");

       
      const payload = {
        name: data.name,
        email: data.nickname,
        gender: data.gender,
        language: data.language,
        country: data.country
      };

      const res = await apiService.updateUser(userId, payload);
      setProfile(res.data);
      toast.success("profile updated successfully");
    } catch (err) {
      console.error(err);
     toast.error("Failed to update profile");
    }
  };

  if (loading) return <div className="text-center mt-5"><Loading/></div>;

  return (
    <Container className="mt-4">
      {/* PROFILE HEADER */}
      <Card className="p-4 mb-4 border-0 shadow-lg profile-card">
        <Row className="align-items-center">
          <Col md={3} className="text-center mb-3 mb-md-0 ms-3">
            <Image
              src={avatarSrc}
              width={150}
              height={150}
              alt="avatar"
              className="rounded-circle border"
              onError={() => setAvatarSrc("/logo.PNG")}
            />
          </Col>
          <Col md={9}>
            <div className="d-flex align-items-center gap-3 mb-2">
              <h3 className="mb-0">{profile.name || "User"}</h3>
            </div>
            <div>
              <strong>Email</strong>
              <p className="mb-0 text-muted">{profile.email || "mail can't be displayed"}</p>
            </div>
          </Col>
        </Row>
      </Card>

      {/* FORM CARD */}
      <Card className="p-4 border-0 shadow-lg profile-card">
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control {...register("name", { required: "Name is required" })} />
                <small className="text-danger">{errors.name?.message}</small>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("nickname", { required: "Email is required" })} />
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