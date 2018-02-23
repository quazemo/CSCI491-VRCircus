﻿#pragma strict

public var hSpeed : float;
public var vSpeed : float;

private var travelDir : Vector3;
private var upDir : Vector3;
private var spawner : SpawnLower;
private var parent : Transform;
private var isDone : boolean;
private var isUp : boolean;

function Awake () 
{
	isDone = false;
	isUp = false;
	parent = gameObject.transform.parent;
	spawner = parent.parent.GetComponent(SpawnLower);
	upDir = parent.transform.up;
	hSpeed = 1;
	vSpeed = .5;

	switch (parent.name)
	{
		case "SpawnLeft":
			travelDir = Vector3.right;
			break;
		case "SpawnMid":
			var dir : int = Random.Range(0, 2);
			switch (dir)
			{
				case 0:
					travelDir = Vector3.left;
					break;
				case 1:
					travelDir = Vector3.right;
					break;
			}
			break;
		case "SpawnRight":
			travelDir = Vector3.left;
			break;
	}
	//transform.SetParent(null);
	
}

function Update () 
{

	if (transform.childCount == 0 && !isDone && isUp)
	{
		isDone = true;
	}
	else if (isUp && !isDone)
	{
		transform.Translate(travelDir * hSpeed * Time.deltaTime);
	}
	else if (!isUp && !isDone)
	{
		if (transform.position.y < parent.transform.position.y)
		{
			transform.Translate(upDir * vSpeed * Time.deltaTime);
		}
		else
		{
			isUp = true;
		}
	}
	else if (isDone && isUp)
	{
		if (transform.position.y >= parent.transform.position.y - SpawnLower.SPAWN_DEPTH)
		{
			transform.Translate(upDir * -vSpeed * Time.deltaTime);
		}
		else
		{
			isUp = false;
		}
	}
	//isDone && !isUp
	else
	{
		spawner.targetDestructed();
		Destroy(gameObject);
	}

}

function OnCollisionEnter(col : Collision)
{
	if (col.gameObject.tag == "ShootingGalleryWall")
	{
		isDone = true;
	}
}