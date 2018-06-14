#pragma strict

private var gun : Transform;
public var displayGun : Transform;
public var colors : Material[];
public var addition : int = 1;
private static var curr : int = 0;

function Awake () {
	//(if there were a player database, load the proper gun here)

}

function next()
{
	curr = (curr + addition) % colors.length;
	if (curr < 0)
	{
		curr = colors.length + curr;
	}
	var child : Transform;
	var i : int;
	for (i = 0; i < gun.childCount; i++)
	{
		//Debug.Log("#Colors: [" + colors.length + "] Childeren: [" + gun.childCount + "] Curr: " + curr);
		child = gun.GetChild(i);
		child.gameObject.GetComponent(Renderer).material = colors[curr];
	}

	for (i = 0; i < displayGun.childCount; i++)
	{
		child = displayGun.GetChild(i);
		child.gameObject.GetComponent(Renderer).material = colors[curr];
	}
}

function OnCollisionEnter(col : Collision)
{
	if (col.gameObject.tag == "Projectile")
	{
		next();
	}
}

function Update()
{
	var gunObj : GameObject = GameObject.FindWithTag("PlayerGun");
	if (gunObj != null)
	{
		gun = gunObj.transform;
		enabled = false;
	}

}
