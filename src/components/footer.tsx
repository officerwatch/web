import { CountOfficers, CountDocuments } from "./countobjects";

function Footer () {

    return (
        <footer className="footer">
            <div className="content has-text-centered is-small">
                <span className="is-size-6"><strong>Officer Watch</strong> by <a href="https://linktr.ee/sundaybrunchclub" target="_new"><strong>Sunday Brunch Club</strong></a></span>
                <br /><br />
                <span className="is-size-6">tracking <CountOfficers /> officers, <strong>3</strong> agencies, <strong>39</strong> incidents,
                <br />
                <CountDocuments /> documents, <strong>934</strong> news articles, &amp; more.</span>
                <br /><br />
                version <a href="https://github.com/officerwatch" target="_new"><strong>0.1.23</strong></a>.
                public data stored on <a href="https://polygonscan.com" target="_new"><strong>polygon</strong></a>.
                ipfs <a href="ipfs://bafybeidcryjungx6qqtvcn53h5w3e4mnztrca64lrz4ab65jf5xy4f5q2u" target="_new"><strong>hash</strong></a>. 
            </div>
        </footer>
    )
}

export default Footer;