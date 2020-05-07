import React from 'react';
import { Button } from 'react-bootstrap';
import session from '../../../../../config/session';

function Comments(props) {

    const deleteComment = id => {
        if (!window.confirm('Apakah kamu yakin ingin menghapus komentar ini?')) { return }
        const s = {
            username: session.get('username'),
            password: session.get('password'),
            id,
            delete: 1
        }
        props.onDelete(s);
    }

    return (
        !props.data.length ?
            <p className="text-muted">Tidak ada komentar.</p>
            :
            props.data.map((c, i) =>
                <div key={i} className="comment-list justify-content-between d-flex my-4">
                    <div className="justify-content-between d-flex">
                        <div className="bg-avatar mr-3 bg-sample" style={{ height: "60px", width: "60px" }}>
                            {/* image */}
                        </div>
                        <div className="desc">
                            <h5 className="h6">
                                <a href="#user" className="color-primary-dark color-primary--hover">
                                    {c.username}
                                </a>
                            </h5>
                            <p className="text-muted mb-1">{c.created}</p>
                            <div>{c.message}</div>
                        </div>
                    </div>
                    {
                        c.username === session.get('username') ? (
                            <div>
                                <Button
                                    variant="link"
                                    onClick={() => deleteComment(c.id)}
                                >Hapus</Button>
                            </div>
                        ) : false
                    }
                </div>
            )
    );
}

export default Comments;