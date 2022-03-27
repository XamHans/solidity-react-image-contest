import {Candidate} from "../interfaces/Candidates";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {BigNumber} from "ethers";

export const CandidateCard = (props: { candidate: Candidate; vote: any }) => {
    const {candidate, vote} = props;

    const getFormattedAddress = () => {
        const firstPart = candidate.candidateAddress?.slice(0, 6)
        const lastPart = candidate.candidateAddress?.slice(-6)
        return `${firstPart}...${lastPart}`
    }

    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    image={candidate.imageHash}
                    alt="candidate image"
                />
                <CardContent>
                    <Typography gutterBottom component="div">
                        Total votes: {(candidate.totalVote as BigNumber).toNumber()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {candidate.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getFormattedAddress()}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{paddingTop: "0"}}>
                    <IconButton aria-label="like picture" sx={{bgcolor: 'info.contrastText', color: 'info.main'}}
                                onClick={() => vote(candidate.candidateAddress)}>
                        <FavoriteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}
