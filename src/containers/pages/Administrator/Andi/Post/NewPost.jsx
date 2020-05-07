import React, { Fragment } from 'react';
import { Row, Col, Form, Container, Button, Image } from 'react-bootstrap';
import session from '../../../../../config/session';
import Table from '../../../../organism/Tables/Post.';
import { reduxActions } from '../../../../../config/redux/actions';
import { connect } from 'react-redux';
import { api } from '../../../../../services/api';

function ProgressBar(props) {
    return (
        <div className="progress" style={{
            height: "3px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px"
        }}>
            <div className="progress-bar" style={{ width: `${props.loaded}%` }}></div>
        </div>
    )
}

class NewPost extends React.Component {

    state = {
        data: {
            title: '',
            body: '',
            category_id: 0,
            image: null,
            image_details: null,
            body_details: ''
        },
        categories: [],
        isloading: false,
        disabled: true,
        posts: [],
        preview: {
            image: null,
            image_details: null
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await reduxActions.setCategories();
        await reduxActions.setPosts();
        const { categories, posts } = this.props;
        this.setState({ categories, posts });
    }

    changeValue = e => {
        let data = { ...this.state.data };

        const { id, value, files } = e.target;

        if (files) {
            const image = files[0];
            data[id] = image;

            const reader = new FileReader();
            reader.onload = () => {
                let preview = { ...this.state.preview };
                preview[id] = reader.result;
                this.setState({ preview });
            }
            reader.readAsDataURL(image);
        } else {
            data[id] = value;
        }

        this.setState({ data });

        if (
            data.title.length > 0 &&
            data.body.length > 0 &&
            Number(data.category_id) > 0 &&
            !Object.values(data).includes(null) &&
            data.body_details.length > 0
        ) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    submit = event => {
        event.preventDefault();

        const data = this.state.data;

        const fd = new FormData();
        fd.append('username', session.get('username'));
        fd.append('password', session.get('password'));
        fd.append('title', data.title);
        fd.append('body', data.body);
        fd.append('category_id', data.category_id);
        fd.append('image', data.image);
        fd.append('image_details', data.image_details);
        fd.append('body_details', data.body_details);

        if (!data.id) {
            this.post(fd);
        } else {
            fd.append('id', data.id);
            fd.append('details_id', data.details_id);
            this.update(fd);
        }
    }

    update = async fd => {
        this.setState({ isloading: true });

        try {
            await api.post('posts', fd);
            this.setState({ isloading: false });
            this.getData();
            this.initState();
        } catch (err) {
            this.setState({ isloading: false });
            console.error(err);
        }
    }

    post = async fd => {
        this.setState({ isloading: true });
        console.log(this.props.progressLoaded)

        try {
            const res = await api.post('posts', fd);
            const posts = this.state.posts.concat(res.data);
            this.setState({ isloading: false, posts });
            this.initState();
            this.setState({ isloading: false });
        } catch (err) {
            this.setState({ isloading: false });
            console.error(err);
        }
    }

    initState = () => {
        const data = {
            title: '',
            body: '',
            category_id: 0,
            image: null,
            image_details: null,
            body_details: ''
        };
        const preview = {
            image: null,
            image_details: null
        };
        this.setState({ data, preview, disabled: true });
        this.props.setProgress(0);
    }

    delete = async () => {
        this.setState({ isloading: true });

        const s = {
            username: session.get('username'),
            password: session.get('password'),
            id: this.state.data.id,
            delete: 1
        };

        try {
            const res = await api.get('posts', s);
            const posts = this.state.posts.filter(p => Number(p.id) !== Number(res.data.id));
            this.setState({ posts, isloading: false });
            this.initState();
        } catch (err) {
            this.setState({ isloading: false });
            console.error(err);
        }
    }

    show = async id => {
        // const post = this.state.posts.find(p => p.id === id);
        // this.setState({ data: post });
        try {
            const res = await api.get('posts', { id });
            const preview = {
                image: res.data.image,
                image_details: res.data.image_details
            };
            this.setState({ data: res.data, preview });
        } catch (err) {
            console.error(err);
        }
    }

    search = async e => {
        const keyword = e.target.value;

        const { posts } = this.props;

        let result = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].title.toLowerCase().includes(keyword.toLowerCase())) {
                result = result.concat(posts[i]);
            }
        }

        this.setState({ posts: result });
    }

    render() {
        const { data, categories, posts, preview, isloading, disabled } = this.state;
        return (
            <Fragment>
                <Form onSubmit={this.submit} className="bg-light rounded-sm brd-gray-light-v2">
                    <div className="mb-3">
                        <ProgressBar loaded={this.props.progressLoaded} />
                    </div>
                    <Container fluid >
                        <h4 className="mb-3">Buat Postingan</h4>
                        <Row>
                            <Col lg={data.id ? 9 : 10}>
                                <Form.Group controlId="title">
                                    <Form.Control
                                        value={data.title}
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Judul postingan..."
                                        onChange={this.changeValue} />
                                </Form.Group>
                            </Col>
                            <Col lg={data.id ? 3 : 2}>
                                <div className="mb-3">
                                    <Button
                                        variant="secondary"
                                        className="mr-2"
                                        onClick={() => this.initState()}
                                    >Batal</Button>
                                    {data.id ?
                                        <Button
                                            variant="danger"
                                            className="mr-2"
                                            onClick={() => this.delete()}
                                            disabled={isloading}
                                        >Hapus</Button>
                                        : false}
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={disabled | isloading}
                                    >Simpan</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={7}>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="category_id">
                                            <Form.Control
                                                value={data.category_id}
                                                as="select"
                                                className="cursor-pointer--hover"
                                                onChange={this.changeValue}
                                            >
                                                <option value={0}>Pilih kategori</option>
                                                {categories.map((g, i) =>
                                                    <option value={g.id} key={i}>{g.name}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <div
                                            onClick={() => this.fileInput.click()}
                                            className="cursor-pointer--hover bg-white rounded-sm p-1 mb-3 brd-gray-light-v2 brd-around"
                                        >
                                            <input
                                                onChange={this.changeValue}
                                                ref={fileInput => this.fileInput = fileInput}
                                                type="file" className="d-none" id="image"
                                            />
                                            <Button
                                                size="sm"
                                                variant="link"
                                            >Pilih Gambar</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Group controlId="body">
                                            <Form.Control
                                                value={data.body}
                                                onChange={this.changeValue}
                                                as="textarea"
                                                rows={4}
                                                placeholder="Tulis sesuatu..." />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={5}>
                                <div
                                    onClick={() => this.inputImgDetails.click()}
                                    className="cursor-pointer--hover bg-white rounded-sm p-1 mb-3 brd-gray-light-v2 brd-around"
                                >
                                    <input
                                        onChange={this.changeValue}
                                        ref={inputImgDetails => this.inputImgDetails = inputImgDetails}
                                        type="file" className="d-none" id="image_details"
                                    />
                                    <Button
                                        size="sm"
                                        variant="link"
                                    >Pilih Gambar</Button>
                                </div>
                                <Form.Group controlId="body_details">
                                    <Form.Control
                                        value={data.body_details}
                                        onChange={this.changeValue}
                                        as="textarea"
                                        rows={4}
                                        placeholder="Tulis sesuatu..." />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col lg={12}>
                                <p className="mb-3">Representasi gambar</p>

                                <div className="p-3">
                                    <Image
                                        onClick={() => this.fileInput.click()}
                                        src={preview.image}
                                        height="80px"
                                        className="mr-3 cursor-pointer--hover" />
                                    <Image
                                        onClick={() => this.inputImgDetails.click()}
                                        src={preview.image_details}
                                        height="80px"
                                        className="cursor-pointer--hover" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Container className="mt-3 p_">
                    <Row>
                        <Col lg={12} className="bg-light pt-3 rounded-sm brd-gray-light-v2">
                            <div>
                                <h4 className="mb-3">Daftar Artikel</h4>
                                <Form.Group controlId="keyword">
                                    <Form.Control as="input" type="search" onChange={this.search} placeholder="Cari di sini.." />
                                </Form.Group>
                            </div>
                            <Table data={posts} onShow={this.show} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories,
    posts: state.posts,
    progressLoaded: state.progressLoaded
});

const reduxDispatch = dispatch => ({
    setProgress: data => dispatch({ type: 'SET_PROGRESS', data })
})

export default connect(mapStateToProps, reduxDispatch)(NewPost);