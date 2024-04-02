import { NavLink } from "react-router-dom";

const Error404 = () => {
    return (
        <div className=" flex flex-col justify-center items-center mt-6">
            <NavLink to="/">
                <button className=" bg-greenLime  hover:bg-blue transition duration-500
                         px-3 mb-3 rounded-xl text-3xl">Back to home</button>
            </NavLink>
            <img className= " max-h-screen" src="https://rick-and-morty-react-app-ruby.vercel.app/static/media/404.d7a01bb798966109aa88.png" alt="Error404" />
        </div>
    )
};

export default Error404;