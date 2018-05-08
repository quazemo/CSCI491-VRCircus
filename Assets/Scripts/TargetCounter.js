#pragma strict

public var director : Director;
public var countText : UI.Text;
public var targetCounts : Dictionary.<String, int>;


function Update () {
	var count : int = countAll();
	if (count <= 0)
	{
		director.onStop();
		countText.text = "" + count;
		enabled = false;
	}
}

private function countAll()
{
	if (targetCounts != null)
	{
		var sum : int = 0;
		for (var key : String in targetCounts.Keys)
		{
			sum += targetCounts[key];
		}
		return sum;
	}
	else
	{
		return 0;
	}
}

//this function accepts a spawner's request for a target by decrementing the target count of the target requested.
//returns true when the request is accepted and false when there are no more signs of the requested type.
public function reqTarget(name : String)
{
	if (name in targetCounts)
	{
		var targRemaining : int = targetCounts[name];
		if (targRemaining > 0)
		{
			targetCounts[name] -= 1;
			return true;
		}
	}
	else
	{
		Debug.Log("Target count [" + name + "] not found");
	}
	return false;
}

function setCount(targCounts : Dictionary.<String, int>, difficultyMultiplier : float)
{
	if (targCounts == null)
	{
		Debug.Log("Cannot set target count to null dictionary");
		return;
	}
	var sum : int = 0;
    targetCounts = new Dictionary.<String, int>();
	for (var key : String in targCounts.Keys)
	{
		targetCounts[key] = targCounts[key] * difficultyMultiplier;
		sum += targetCounts[key];
	}
	countText.text = "" + sum;
}

public function getTargetCounts()
{
	return targetCounts;
}