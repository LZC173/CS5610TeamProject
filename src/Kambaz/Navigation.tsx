import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";


export default function KambazNavigation() {
    return (
        <ListGroup
            id="wd-kambaz-navigation"
            style={{ width: 120 }}
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <ListGroup.Item
                id="wd-neu-link"
                target="_blank"
                action
                href="https://www.northeastern.edu/"
                className="bg-black border-0 text-center">
                <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
            </ListGroup.Item>

            <ListGroup.Item
                to="/Kambaz/Account"
                as={Link}
                className="text-center border-0 bg-black text-white">
                <FaRegCircleUser className="fs-1 text-white" />
                Account
            </ListGroup.Item>

            <ListGroup.Item
                to="/Kambaz/Dashboard"
                as={Link}
                className="text-center border-0 bg-white text-danger">
                <AiOutlineDashboard className="fs-1 text-danger" />
                Dashboard
            </ListGroup.Item>

            <ListGroup.Item
                to="/Kambaz/Courses"
                as={Link}
                className="text-center border-0 bg-black text-white">
                <LiaBookSolid className="fs-1 text-danger" />
                Courses
            </ListGroup.Item>

            <ListGroup.Item
                to="/Kambaz/Calendar"
                as={Link}
                className="text-center border-0 bg-black text-white">
                <IoCalendarOutline className="fs-1 text-danger" />
                Calendar
            </ListGroup.Item>

            <ListGroup.Item
                to="/Kambaz/Inbox"
                as={Link}
                className="text-center border-0 bg-black text-white">
                <FaInbox className="fs-1 text-danger" />
                <br/>
                Inbox
            </ListGroup.Item>

            <ListGroup.Item
                to="/Labs"
                as={Link}
                className="text-center border-0 bg-black text-white">
                <LiaCogSolid className="fs-1 text-danger" />
                <br />
                Labs
            </ListGroup.Item>
        </ListGroup>
    );
}