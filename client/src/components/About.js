import React from 'react'

export default function About() {
    return (
        <div className='flow-text'>
            <h3>
                Generate pin and serial number for your
                business.
            </h3>
            <ul className="collection with-header">
                <li className="collection-header"><h4>To use the site</h4></li>
                <li className="collection-item">Sign up with a valid email or login if already signed up</li>
                <li className="collection-item">Go to card pannel to generate and manage card pins and serial number</li>
            </ul>
            <h3>Printing of Cards</h3>
            <p>
                You can fetch the card details you generated from
                from an API using the provided URL. You need your API key for this.<br />
                Check your profile for the URL and your API key.
            </p>
            <p>
                You can still do quick printing of the card from the page.<br />
                To do so, Check the cards you want to print and click the print 
                button at the bottom of the page. 
            </p>
            <p>
                Printing from the page will only print the pins and serial 
                numbers of the selected cards.
            </p>
            <p>
                You can still add you brand information which will be added to each card before
                printing.
            </p>
            <p className='red darken-2 white-text caution'>
                <span>Caution:<br /></span>
                There is no print cancelation. Once the print button is 
                clicked and print preview showed up, the print process cannot 
                be canceled. <br />
                This is because when card is printed they are updated on the database
                There is no way to determine if the process is completed 
                or canceled on the client.
            </p>
        </div>
    )
}
