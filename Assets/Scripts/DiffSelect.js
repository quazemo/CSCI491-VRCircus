#pragma strict

public var start : Start;
public var menuHand : MenuGroup;
public var diff : int = 1;
public var text : UI.Text;

function OnCollisionEnter(col : Collision)
{
	if (col.gameObject.tag == "Projectile")
	{
		start.setDifficulty(diff);
		menuHand.toggleSelect(this);
	}
}

function select(selected : boolean)
{
	if (selected){
		text.color = Color.white;
		gameObject.GetComponent(Renderer).material.color.a = 0;
	}
	else
	{
		text.color = Color.grey;
	}
}