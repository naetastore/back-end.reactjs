import React from 'react';
import { Form } from 'react-bootstrap';

class CommentForm extends React.Component {

    state = {
        id: 0,
        data: {
            subject: '',
            message: ''
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
    }

    componentDidUpdate() {
        const id = this.props.match.params.id;
        if (id !== this.state.id) {
            this.setState({ id, data: { subject: '', message: '' } });
        }
    }

    init = () => {
        this.setState({
            data: {
                subject: '',
                message: ''
            }
        });
    }

    changeValue = e => {
        let data = { ...this.state.data };
        data[e.target.id] = e.target.value;
        this.setState({ data });
    }

    submit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.data);
        this.init();
    }

    render() {
        return (
            <Form onSubmit={this.submit}>
                <Form.Group controlId="subject">
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        onChange={this.changeValue}
                        value={this.state.data.subject}
                        placeholder="Subjek"
                    />
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Control
                        as="textarea"
                        maxLength={384}
                        rows={4}
                        type="text"
                        onChange={this.changeValue}
                        value={this.state.data.message}
                        placeholder="Tulis komentar"
                    />
                </Form.Group>
                <button type="submit"
                    className="font-weight-600
                        bg-linear-gradient
                        bg-linear-gradient-v2--hover
                        text-white
                        rounded-sm py-2 w-100"
                >
                    Kirim
                </button>
            </Form>
        );
    }
}

export default CommentForm;