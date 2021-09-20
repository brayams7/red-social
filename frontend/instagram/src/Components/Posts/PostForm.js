import React from 'react';


const PostForm = ({handleChange, handleChangeImage, errors, handleSumbit, form, handleBlur, handleReset}) => {

    return (
        <form name="postForm" onSubmit={handleSumbit}>
            <div className="form-group my-2">
                <label htmlFor="photo" className="form-label">Post</label>
                <input name="photo" type="file" className="form-control" onChange={handleChangeImage} onBlur={handleBlur}/>
                {
                    errors.photo &&(
                        <p className="text-danger">
                            {errors.photo}
                        </p>
                    )
                }
            </div>
            <div className="form-group">
                <textarea name="description" className="form-control" placeholder="descripcion..." id="description" onChange={handleChange} value={form.description} onBlur={handleBlur}></textarea>
                <label htmlFor="description">descripcion</label>
                {
                    errors.description &&(
                        <p className="text-danger">
                            {errors.description}
                        </p>
                    )
                }
            </div>
            <div className="text-center">
                <input type="submit" className="btn btn-success mx-2" value="subir"/>
                <input type="reset" className="btn btn-primary" value="limpiar" onClick={handleReset}/>
                
            </div>

        </form>
    );
};

export default PostForm;