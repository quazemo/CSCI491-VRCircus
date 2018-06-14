using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerCatapult : Catapult
{

    protected override void Aim()
    {
        Vector2 iPos = GvrControllerInput.TouchPos;
        float y = 2.5f;
        float x = 0.0f + (4.5f * iPos.y);

        float rot = 0.0f + ((-0.5f + iPos.x) * 30.0f);

        transform.eulerAngles = new Vector3(transform.eulerAngles.x, rot, transform.eulerAngles.z);
        balloonSpawn.transform.localPosition = new Vector3(x, 0.0f, y);   
        if ((GvrControllerInput.ClickButtonUp || Input.GetMouseButtonUp(0)))
		{
			Release();
		}
    }

}
