#pragma strict

public var dir : Director;
private var isEnabled : boolean = false;
public var pauseText : UI.Text;
public var resumeText : UI.Text;

function OnCollisionEnter(col : Collision)
{
	Debug.Log("Stop: Collided with " + col.gameObject.tag);
	if (dir.gameRunning() && isEnabled)
	{
		if (dir.gamePaused())
		{
			dir.onResume();
			pauseText.color = Color.white;
			resumeText.color = Color.grey;
		}
		else
		{
			dir.onPause();
			pauseText.color = Color.grey;
			resumeText.color = Color.white;
		}
	}
}

//this function activates/disables the pause button.
function pauseEnable(doEnable : boolean)
{
	if (doEnable)
	{
		isEnabled = true;
		pauseText.color = Color.white;
		resumeText.color = Color.grey;
	}
	else
	{
		isEnabled = false;
		pauseText.color = Color.grey;
		resumeText.color = Color.grey;
	}
}