#pragma strict

public var playerScore : int = 0;
public var scoreboard : UI.Text;

function addScore(point: int, dist: int)
{
	var addition : int = point * dist;
	var result : int = playerScore + addition;
	if (addition < 0 && playerScore < 0 && result >= 0)
	{
		playerScore = Number.MinValue;
	}
	else if (addition > 0 && playerScore > 0 && result < 0)
	{
		playerScore = Number.MaxValue;
	}
	else
	{
		playerScore = result;
	}

	updateText();
}

function getScore() : int
{
	return playerScore;
}

function updateText()
{
	scoreboard.text = "Score: " + playerScore;
}
