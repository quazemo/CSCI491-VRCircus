#pragma strict

private var ccObj : ChildCollider;
public var obj : GameObject;

function Start()
{
	if (obj == null)
	{
		Debug.Log("Null target obj for child collider");
	}
	ccObj = obj.GetComponent(Target) as ChildCollider;
	if (ccObj == null)
	{
		Debug.Log("Null target ccObj for child collider");
	}
}

function OnCollisionEnter(col : Collision)
{
	//Debug.Log("Target: Hit by " + col.gameObject.tag);
	if (col.gameObject.tag == "Projectile")
	{
		ccObj.contact(col, gameObject);
	}
}

